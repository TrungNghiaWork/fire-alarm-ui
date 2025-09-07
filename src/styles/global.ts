import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    background: ${theme.colors.pageBG};
    color: ${theme.colors.text};
    font: ${theme.fontSize.md}/${theme.lineHeight.normal} system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${theme.colors.info};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    
    &:disabled {
      cursor: not-allowed;
    }
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  .card {
    background: ${theme.colors.cardBG};
    border-radius: ${theme.radius.lg};
    box-shadow: ${theme.shadow.md};
  }

  /* Utility classes */
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .font-bold {
    font-weight: ${theme.fontWeight.bold};
  }

  .font-semibold {
    font-weight: ${theme.fontWeight.semibold};
  }

  .font-medium {
    font-weight: ${theme.fontWeight.medium};
  }

  .text-primary {
    color: ${theme.colors.primary};
  }

  .text-gray {
    color: ${theme.colors.textGray};
  }

  .text-light {
    color: ${theme.colors.textLight};
  }

  .text-danger {
    color: ${theme.colors.danger};
  }

  .text-success {
    color: ${theme.colors.success};
  }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: ${theme.spacing.xs}; }
  .mb-2 { margin-bottom: ${theme.spacing.sm}; }
  .mb-3 { margin-bottom: ${theme.spacing.md}; }
  .mb-4 { margin-bottom: ${theme.spacing.lg}; }
  .mb-5 { margin-bottom: ${theme.spacing.xl}; }
  .mb-6 { margin-bottom: ${theme.spacing.xxl}; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: ${theme.spacing.xs}; }
  .mt-2 { margin-top: ${theme.spacing.sm}; }
  .mt-3 { margin-top: ${theme.spacing.md}; }
  .mt-4 { margin-top: ${theme.spacing.lg}; }
  .mt-5 { margin-top: ${theme.spacing.xl}; }
  .mt-6 { margin-top: ${theme.spacing.xxl}; }
`;
