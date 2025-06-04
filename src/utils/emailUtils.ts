export const localAreas = [
  'Belfast',
  'Newtownabbey',
  'Whiteabbey',
  'Glengormley',
  'Carrickfergus',
  'Mallusk',
  'Limavady',
  'Coleraine',
  'Antrim',
  // Add more local areas as needed
];

export function getVisitText(business_location: string, return_date?: string) {
  if (localAreas.includes(business_location) && return_date) {
    return `I'll be in the ${business_location} area on ${return_date} and would be happy to call in for a quick chat/site visit and maybe take some test photographs (at no cost). The one-time fee includes photography, tour creation, and integration with your Google Business profile. There are no ongoing costs unless you would prefer a more custom, bespoke solution which may suit better.`;
  } else {
    return `I'll be in the ${business_location} area in the next couple of weeks and would be happy to call in for a quick chat/site visit and maybe take some test photographs (at no cost). The one-time fee includes photography, tour creation, and integration with your Google Business profile. There are no ongoing costs unless you would prefer a more custom, bespoke solution which may suit better.`;
  }
}