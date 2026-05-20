export function initTheme() {
  if (typeof window === 'undefined') return
  const theme = localStorage.getItem('theme')
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
}