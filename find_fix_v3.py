import sys

with open('src/routes/find.tsx', 'r') as f:
    content = f.read()

# 1. Add useQuery import
if 'useQuery,' not in content:
    content = content.replace('useInfiniteQuery, useMutation', 'useQuery, useInfiniteQuery, useMutation')

# 2. Add userListings query
user_listings_query = """
  const { data: userListings = [] } = useQuery({
    queryKey: ["user_listings", camp],
    enabled: !!camp,
    queryFn: async () => {
      const raw = localStorage.getItem("kitmatch:owner_tokens");
      if (!raw) return [];
      const map = JSON.parse(raw) as Record<string, string>;
      const ids = Object.keys(map);
      if (ids.length === 0) return [];

      const { data, error } = await supabase
        .from("swap_requests")
        .select("id, item, have_size, need_size")
        .in("id", ids)
        .eq("status", "available");

      if (error) throw error;
      return data;
    }
  });
"""

if 'const { perfect, others } = useMemo(() => {' in content:
    content = content.replace('const { perfect, others } = useMemo(() => {', user_listings_query + '\n  const { perfect, others } = useMemo(() => {')

# 3. Update perfect match logic to use userListings
old_logic = """    const isPerfect = (l: SwapRow) => {
      if (myActiveListings.length === 0) return false;

      const isMine = !!getOwnerToken(l.id);
      if (isMine) {
        // My listing is "perfect" if there's at least one OTHER person's listing that matches it
        return listings.some(
          (o) =>
            !getOwnerToken(o.id) &&
            o.item === l.item &&
            o.have_size === l.need_size &&
            o.need_size === l.have_size,
        );
      } else {
        // Someone else's listing is "perfect" if it matches one of MY listings
        return myActiveListings.some(
          (my) =>
            l.item === my.item && l.have_size === my.need_size && l.need_size === my.have_size,
        );
      }
    };"""

new_logic = """    const isPerfect = (l: SwapRow) => {
      if (userListings.length === 0) return false;

      const isMine = userListings.some((my) => my.id === l.id);
      if (isMine) {
        // My listing is "perfect" if there's at least one OTHER person's listing that matches it
        // We still check 'listings' here because we want to know if there's a match visible in current results
        return listings.some(
          (o) =>
            !userListings.some((my) => my.id === o.id) &&
            o.item === l.item &&
            o.have_size === l.need_size &&
            o.need_size === l.have_size,
        );
      } else {
        // Someone else's listing is "perfect" if it matches one of MY listings
        return userListings.some(
          (my) =>
            l.item === my.item && l.have_size === my.need_size && l.need_size === my.have_size,
        );
      }
    };"""

content = content.replace(old_logic, new_logic)

# 4. Update myActiveListings to be empty as it's no longer used for core logic
content = content.replace('const myActiveListings = listings.filter((l) => myListingIds.includes(l.id));', 'const myActiveListings = []; // Handled by userListings query now')

with open('src/routes/find.tsx', 'w') as f:
    f.writelines(content)
