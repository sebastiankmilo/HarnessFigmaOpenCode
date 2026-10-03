#!/usr/bin/env bash
set -euo pipefail

# Regenera la rama gh-pages (GitHub Pages) a partir de site/ y la sube a origin.
# Uso: ./scripts/deploy-pages.sh   (desde cualquier punto del repo)

root="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "ERROR: no estás dentro del repositorio." >&2
  exit 1
}
cd "$root"

if [ ! -f site/index.html ]; then
  echo "ERROR: no encuentro site/index.html." >&2
  exit 1
fi

# gh-pages no puede estar checkeada en ningún worktree: se reescribe con update-ref.
if git worktree list --porcelain | grep -qx 'branch refs/heads/gh-pages'; then
  echo "ERROR: la rama gh-pages está checkeada en un worktree; desenróllala antes." >&2
  exit 1
fi

# Índice temporal: arma el árbol desde site/ sin tocar el working tree actual.
export GIT_INDEX_FILE
GIT_INDEX_FILE="$(mktemp)"
trap 'rm -f "$GIT_INDEX_FILE"' EXIT

git read-tree --empty
(
  cd site
  git --work-tree="$root/site" add -A -- . \
    ':(exclude).DS_Store' ':(exclude)**/.DS_Store'
)

# .nojekyll: evita que GitHub Pages procese el sitio con Jekyll.
empty_blob="$(git hash-object -w --stdin </dev/null)"
git update-index --add --cacheinfo "100644,$empty_blob,.nojekyll"

tree="$(git write-tree)"
prev="$(git rev-parse --verify --quiet gh-pages || true)"
msg="Republish: sitio publicado desde site/"
if [ -n "$prev" ]; then
  commit="$(printf '%s\n' "$msg" | git commit-tree "$tree" -p "$prev")"
else
  commit="$(printf '%s\n' "$msg" | git commit-tree "$tree")"
fi
git update-ref refs/heads/gh-pages "$commit"

git push origin gh-pages

# URL pública de GitHub Pages calculada desde remote.origin.url
origin_url="$(git config --get remote.origin.url)"
slug="$(printf '%s' "$origin_url" | sed -E 's#^.*github\.com[:/]##; s#\.git$##')"
owner="${slug%%/*}"
repo="${slug##*/}"
echo "OK: gh-pages actualizada → https://${owner}.github.io/${repo}/"
