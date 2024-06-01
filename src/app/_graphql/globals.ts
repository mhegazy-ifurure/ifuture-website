import { LINK_FIELDS } from "./link";

export const HEADER = `
  Header(locale:$locale) {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`;

export const HEADER_QUERY = `
query Header($locale:LocaleInputType) {
  ${HEADER}
}
`;

export const FOOTER = `
  Footer(locale:$locale) {
    slogan
    copyright
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`;

export const FOOTER_QUERY = `
query Footer($locale:LocaleInputType) {
  ${FOOTER}
}
`;

export const SETTINGS = `
  Settings {
    postsPage {
      slug
    }
    projectsPage {
      slug
    }
  }
`;

export const SETTINGS_QUERY = `
query Settings {
  ${SETTINGS}
}
`;
