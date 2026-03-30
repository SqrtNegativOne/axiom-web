import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Axiom — The Philosophy Society'
const SITE_URL = 'https://axiomnsut.in'
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.png`
const DEFAULT_DESCRIPTION =
  'Axiom is the philosophy society at NSUT — fostering intellectual curiosity, critical thinking, and philosophical inquiry since 2017.'

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  type = 'website',
  image = DEFAULT_IMAGE,
  noindex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="Axiom — The Philosophy Society logo" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
