// ==UserScript==
// @name        Disable eXistDB XAR uploader
// @namespace   eXistDB Utility
// @match       *://*.optum.com/exist/apps/dashboard/admin
// @grant       none
// @version     1.0
// @author      -
// @description Removes the manual uploader from eXistDB's dashboard to prevent unintentional installations. This assumes XARs are installed via some other approved way.
// ==/UserScript==
const observeDOM = (fn, e = document.documentElement, config = { childList: 1, subtree: 1 }) => {
  const observer = new MutationObserver(fn)
  observer.observe(e, config)
  return () => observer.disconnect()
}

observeDOM(() => {
  const dashboard = document.querySelector('existdb-dashboard')?.shadowRoot
  const appDrawer = dashboard?.querySelector('#drawerLayout')
  const pages = appDrawer?.querySelector('#pages')
  const packageManager = pages?.querySelector('existdb-packagemanager')
  const layout = packageManager?.shadowRoot.querySelector('#layout')
  const uploader = layout?.querySelector('#uploader')
  uploader?.remove()
})

