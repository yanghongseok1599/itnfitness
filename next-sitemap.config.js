/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://YOUR-DOMAIN', // 배포 후 실제 도메인으로 변경
  generateRobotsTxt: false, // public/robots.txt를 이미 생성했으므로 false
  exclude: ['/api/*'], // API 경로 제외
  generateIndexSitemap: false, // 단일 sitemap.xml 생성
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // 추가 옵션
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
