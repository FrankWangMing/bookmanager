async function export_data() {
  /* dynamically import the SheetJS Wrapper */
  const XLSX = await import('./SheetJSWriteWrapper')
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet([
    ['a', 'b', 'c'],
    [1, 2, 3]
  ])
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFileXLSX(wb, 'SheetJSDynamicWrapperTest.xlsx')
}
