import type { LinkObject } from "../types"

export function staticAsset(assetName: string): string {
    return `${import.meta.env.BASE_URL}${assetName}`
}

export const presetLinkIcon = new Map<string,string>([
    ['GitHub', 'icon-github.svg'],
    ['YouTube', 'icon-youtube.svg'],
    ['LinkedIn', 'icon-linkedin.svg'],
    ['Stack Overflow','icon-staci-overflow.svg'],
    ['CodePen','icon-codepen.svg'],
    ['CodeWars','icon-codewars.svg'],
    ['DEV Community','icon-devto.svg'],
    ['FaceBook','icon-facebook.svg'],
    ['FreeCodeCamp','icon-freecodecamp.svg'],
    ['FrontEndMentor','icon-frontend-mentor.svg'],
    ['GitLab','icon-gitlab.svg'],
    ['HashNode','icon-hashnode.svg'],
    ['Twitch','icon-twitch.svg'],
    ['Twitter','icon-twitter.svg']
])

export const linksPreset: LinkObject[] = [
    {
        platform: 'GitHub',
        link: 'http://www.github.com',
    },
    {
        platform: 'YouTube',
        link: 'http://www.yourtube.com',
    },
    {
        platform: 'LinkedIn',
        link: 'http://www.linkedin.com',
    },
    {
        platform: 'Stack Overflow',
        link: 'http://www.stackoverflow.com',
    },
    {
        platform: 'CodePen',
        link: 'http://www.codepen.com',
    },
    {
        platform: 'CodeWars',
        link: 'http://www.codewars.com',
    },
    {
        platform: 'DEV Community',
        link: 'http://www.dev.to',
   },
    {
        platform: 'FaceBook',
        link: 'http://www.facebook.com',
    },
    {
        platform: 'FreeCodeCamp',
        link: 'http://www.freecodecamp.org',
    },
    {
        platform: 'FrontEndMentor',
        link: 'http://www.frontendmentor.io',
    },
    {
        platform: 'GitLab',
        link: 'http://www.gitlab.com',
    },
    {
        platform: 'HashNode',
        link: 'http://www.hashnode.com',
    },
    {
        platform: 'Twitch',
        link: 'http://www.twitch.com',
    },
    {
        platform: 'Twitter',
        link: 'http://www.X.com',
    }
];

