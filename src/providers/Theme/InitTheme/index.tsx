import Script from 'next/script'
import React from 'react'

interface InitThemeProps {
  serverDefaultTheme?: string
  primaryColor?: string
  accentColor?: string
}

export const InitTheme: React.FC<InitThemeProps> = ({
  serverDefaultTheme = 'light',
  primaryColor = '#6750A4',
  accentColor = '#4CA3C7',
}) => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            --color-primary: ${primaryColor};
            --color-accent: ${accentColor};
          }
        `,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        dangerouslySetInnerHTML={{
          __html: `
    (function () {
      function getImplicitPreference() {
        var mediaQuery = '(prefers-color-scheme: dark)'
        var mql = window.matchMedia(mediaQuery)
        var hasImplicitPreference = typeof mql.matches === 'boolean'

        if (hasImplicitPreference) {
          return mql.matches ? 'dark' : 'light'
        }

        return null
      }

      function themeIsValid(theme) {
        return theme === 'light' || theme === 'dark'
      }

      var themeToSet = '${serverDefaultTheme}'
      var preference = window.localStorage.getItem('payload-theme')

      if (themeIsValid(preference)) {
        themeToSet = preference
      } else if (themeToSet === 'auto') {
        var implicitPreference = getImplicitPreference()

        if (implicitPreference) {
          themeToSet = implicitPreference
        } else {
          themeToSet = 'light'
        }
      }

      document.documentElement.setAttribute('data-theme', themeToSet)
    })();
    `,
        }}
        id="theme-script"
        strategy="beforeInteractive"
      />
    </>
  )
}
