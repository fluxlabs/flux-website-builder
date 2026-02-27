export function generateThemeCSS(primaryColor: string) {
  return `
    :root {
      --primary: ${primaryColor};
      --primary-foreground: #ffffff;
      --secondary: #000000;
      --secondary-foreground: #ffffff;
      --accent: ${primaryColor}1a;
      --background: #ffffff;
      --foreground: #0a0a0a;
      --border: rgba(0, 0, 0, 0.1);
    }

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: var(--background);
      color: var(--foreground);
    }

    * {
      box-sizing: border-box;
    }
  `;
}
