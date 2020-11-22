const Search = async (keyword) => {
  const res = await fetch('/search', {
    method: 'POST',
    body: JSON.stringify({
      keyword
    }),
  })
  console.log(res)
  return res;
}

export default Search;