import sys

with open('src/routes/find.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'isLoading, isError, error: queryError' in line:
        # Avoid double replacement if it already happened
        if 'isRefetching' not in line:
            new_lines.append(line.replace('isLoading, isError, error: queryError', 'isLoading, isError, error: queryError, refetch, isRefetching'))
        else:
            new_lines.append(line)
    elif 'Try Again' in line:
        new_lines.append('              {isRefetching ? "Refreshing..." : "Try Again"}\n')
    else:
        new_lines.append(line)

with open('src/routes/find.tsx', 'w') as f:
    f.writelines(new_lines)
