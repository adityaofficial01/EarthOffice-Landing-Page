/**
 * AntdThemeStyle.js
 * CUSTOMIZE ANTD COMPONENTS >>::::-------->>>>>>>>>>> https://ant.design/theme-editor?theme=dark&theme=happy-work#component-style
 */
// Helper function to get CSS variables from :root
const getCSSVariable = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

export const AntdThemeColors = {
  token: {
    wireframe: true,
    fontSizeReset:16,
    colorError: getCSSVariable('--tertiaryRed'),
    colorSuccessReset: getCSSVariable('--tertiaryGreen'),
  },
  components: {
    Checkbox: {
      colorPrimary: getCSSVariable('--tertiaryRed'),
      colorPrimaryHover: getCSSVariable('--tertiaryRed'),
      colorPrimaryChecked: getCSSVariable('--tertiaryRed'),
    },
    Input: {
      colorIcon: getCSSVariable('--tertiaryRed'),
      colorPrimaryActive: getCSSVariable('--tertiaryRed'),
    },
    Collapse: {
      headerBg: 'transparent',
      contentBg: getCSSVariable('--primaryGrey')
    },
    Popover: {
      colorBgElevated:  getCSSVariable('--primaryRed'),
    },
    Carousel: {
      colorBgContainer: getCSSVariable('--primaryBlue'),
      dotActiveWidth:10,
      // arrowSize:35,
      dotHeight:10
    }
  },
};