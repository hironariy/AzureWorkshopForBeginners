FILE="materials/presentation-html/lesson-02.html"
[[ -f "$FILE" ]] && echo "Exists: Yes" || echo "Exists: No"
echo "doctype count: $(grep -i -c '<!doctype html>' "$FILE")"
echo "</html> count: $(grep -i -c '</html>' "$FILE")"
echo "Slide count: $(grep -c '<section class="slide"' "$FILE")"
echo "screenshots-not-masked count: $(grep -c 'screenshots-not-masked' "$FILE")"
echo "L03- count: $(grep -c 'L03-' "$FILE")"
ls fix_html.pl lesson-02.html.tmp 2>/dev/null || echo "No temp files found"
echo "Image verification (summary):"
grep -oE 'src="[^"]+"' "$FILE" | cut -d'"' -f2 | while read img; do
    if [[ "$img" == http* ]]; then continue; fi
    [[ -f "materials/presentation-html/$img" ]] || echo "MISSING: $img"
done | sort | uniq -c
if command -v tidy >/dev/null; then
    tidy -q -e "$FILE"
else
    echo "tidy not installed"
fi
