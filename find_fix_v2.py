import sys

with open('src/routes/find.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'isLoading } = useInfiniteQuery({' in line:
        new_lines.append(line.replace('isLoading }', 'isLoading, isError, error: queryError }'))
    elif 'if (error) throw error;' in line:
        new_lines.append('      if (error) {\n')
        new_lines.append('        console.error("Supabase error:", error);\n')
        new_lines.append('        throw error;\n')
        new_lines.append('      }\n')
    elif '{isLoading ? (' in line:
        new_lines.append('        {isError ? (\n')
        new_lines.append('          <div className="py-16 text-center text-destructive">\n')
        new_lines.append('            <p className="font-semibold">Failed to load listings</p>\n')
        new_lines.append('            <p className="text-sm opacity-70">{(queryError as Error)?.message || "Unknown error"}</p>\n')
        new_lines.append('            <Button variant="outline" className="mt-4 h-10 rounded-xl" onClick={() => qc.invalidateQueries({ queryKey: ["swap_requests"] })}>\n')
        new_lines.append('              Try Again\n')
        new_lines.append('            </Button>\n')
        new_lines.append('          </div>\n')
        new_lines.append('        ) : isLoading ? (\n')
    else:
        new_lines.append(line)

with open('src/routes/find.tsx', 'w') as f:
    f.writelines(new_lines)
