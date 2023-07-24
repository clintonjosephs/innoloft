import Document, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content=" Innoloft is a leading software technology company offering LoftOS, a B2B platform solution to configure digital platforms without coding. Create digital ecosystems, industry marketplaces, and more with our flexible SaaS solution.
Keywords: software technology company, B2B platform, LoftOS, digital platforms, customizable platform modules, economic ministries, research organizations, innovation management platforms, software-as-a-service, platform development" />
          <meta name="keywords" content="frontend team, Innoloft, software technology company, core platform, new functionalities, digital ecosystems, industry marketplaces, frontend applications" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Join Our Frontend Team | Software Technology Company - Innoloft" />
          {/* <meta property="og:url" content="" /> */}
          <meta property="og:site_name" content="Ella | Waffles" />
        </Head>
        <body className="vh-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
