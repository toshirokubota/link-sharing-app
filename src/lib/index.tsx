import type { LinkObject } from "../types"

export function staticAsset(assetName: string): string {
    return `${import.meta.env.BASE_URL}${assetName}`
}

export const presetLinkIcon = new Map<string,string>([
    ['GitHub', 'icon-github.svg'],
    ['YouTube', 'icon-youtube.svg'],
    ['LinkedIn', 'icon-linkedin.svg'],
    ['Stack Overflow','icon-stack-overflow.svg'],
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
    ['YouTube', 'http://www.youtube.com'],
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

export const presetLinkColor = new Map<string,{backgroundColor:string,color:string}>([
    ['GitHub', {backgroundColor:'#1A1A1A', color: 'white'}],
    ['YouTube', {backgroundColor:'#EE3939', color: 'white'}],
    ['LinkedIn', {backgroundColor:'#2D68FF', color: 'white'}],
    ['Stack Overflow',{backgroundColor:'#EC7100', color: 'white'}],
    ['CodePen',{backgroundColor:'#247845', color: 'white'}],
    ['CodeWars',{backgroundColor:'#8A1A50', color: 'white'}],
    ['DEV Community',{backgroundColor:'#333333', color: 'white'}],
    ['FaceBook',{backgroundColor:'#2442AC', color: 'white'}],
    ['FreeCodeCamp',{backgroundColor:'#302267', color: 'white'}],
    ['FrontEndMentor',{backgroundColor:'white', color: '#333333'}],
    ['GitLab',{backgroundColor:'#EB4925', color: 'white'}],
    ['HashNode',{backgroundColor:'#0330D1', color: 'white'}],
    ['Twitch',{backgroundColor:'#EE3FC8', color: 'white'}],
    ['Twitter',{backgroundColor:'#43B7E9', color: 'white'}]
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

export const storageKeyPrefix = 'link_share'
export const storageKeys = {
    links: 'links',
    profile: 'profile',
    signup: 'signup',
}
export const formStorageKey = (key: keyof typeof storageKeys) => {
    return storageKeyPrefix + '.' + storageKeys[key];
}

const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export function isValidURL(url: string): boolean {
    return urlRegex.test(url);
}

export function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
}

export function isEmpty(str: string): boolean {
    return str.trim().length === 0;
}
