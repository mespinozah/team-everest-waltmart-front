export const environment = {
  production: true,
  captchaService: {
    baseUrl: '${captchaService.baseUrl}',
    getCaptcha: '/captcha/{door}',
    validate: '/captcha',
  },
  contentService: {
    baseUrl: '${captchaService.baseUrl}',
    getMeme: '/content/{door}',
  },
};
