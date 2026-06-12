import sys

with open('src/routes/find.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if '<EmptyState />' in line:
        # Check if perfectOnly is true
        new_lines.append('          <EmptyState \n')
        new_lines.append('            perfectOnly={!!perfectOnly} \n')
        new_lines.append('            hasFilters={itemFilter !== "all" || sizeFilter !== "all"}\n')
        new_lines.append('            onClearFilters={() => updateFilters({ item: "all", size: "all", perfect: False })}\n')
        new_lines.append('          />\n')
    elif 'function EmptyState() {' in line:
        new_lines.append('function EmptyState({ perfectOnly, hasFilters, onClearFilters }: { perfectOnly?: boolean; hasFilters?: boolean; onClearFilters?: () => void }) {\n')
    elif 'Be the first to post a swap in your camp.' in line:
        new_lines.append('        {perfectOnly ? "No perfect matches found. Try showing all listings or changing your filters." : "Be the first to post a swap in your camp."}\n')
    elif '<Link to="/post">Post a Swap</Link>' in line:
        new_lines.append('        {perfectOnly || hasFilters ? (\n')
        new_lines.append('          <Button onClick={onClearFilters} variant="secondary" className="mt-4 h-11 rounded-xl w-full">Clear All Filters</Button>\n')
        new_lines.append('        ) : (\n')
        new_lines.append('          <Link to="/post">Post a Swap</Link>\n')
        new_lines.append('        )}\n')
    else:
        new_lines.append(line)

with open('src/routes/find.tsx', 'w') as f:
    f.writelines(new_lines)
