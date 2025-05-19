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
]);

export const presetLinkURL = new Map<string,string>([
    ['GitHub', 'http://www.github.com'],
    ['YouTube', 'http://www.yourtube.com'],
    ['LinkedIn', 'http://www.linkedin.com'],
    ['Stack Overflow','http://www.stackoverflow.com'],
    ['CodePen','http://www.codepen.com'],
    ['CodeWars','http://www.codewars.com'],
    ['DEV Community','http://www.dev.to'],
    ['FaceBook','http://www.facebook.com'],
    ['FreeCodeCamp','http://www.freecodecamp.org'],
    ['FrontEndMentor','http://www.frontendmentor.io'],
    ['GitLab','http://www.gitlab.com'],
    ['HashNode','http://www.hashnode.com'],
    ['Twitch','http://www.twitch.com'],
    ['Twitter','http://www.X.com']
])

export const linksPreset: LinkObject[] = [
    {
        platform: 'GitHub',
        link: '',
    },
    {
        platform: 'YouTube',
        link: '',
    },
    {
        platform: 'LinkedIn',
        link: '',
    },
    {
        platform: 'Stack Overflow',
        link: '',
    },
    {
        platform: 'CodePen',
        link: '',
    },
    {
        platform: 'CodeWars',
        link: '',
    },
    {
        platform: 'DEV Community',
        link: '',
   },
    {
        platform: 'FaceBook',
        link: '',
    },
    {
        platform: 'FreeCodeCamp',
        link: '',
    },
    {
        platform: 'FrontEndMentor',
        link: '',
    },
    {
        platform: 'GitLab',
        link: '',
    },
    {
        platform: 'HashNode',
        link: '',
    },
    {
        platform: 'Twitch',
        link: '',
    },
    {
        platform: 'Twitter',
        link: '',
    }
];

