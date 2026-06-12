import sys

with open('src/routes/find.tsx', 'r') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if 'mt-8 pt-6 border-t flex items-center justify-center gap-5' in line:
        start_idx = i
    if start_idx != -1 and '</div>' in line and i > start_idx:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + ['        <Footer />\n'] + lines[end_idx+1:]
    with open('src/routes/find.tsx', 'w') as f:
        f.writelines(new_lines)
    print("Successfully replaced manual footer with Footer component.")
else:
    print(f"Could not find manual footer. start_idx: {start_idx}, end_idx: {end_idx}")
