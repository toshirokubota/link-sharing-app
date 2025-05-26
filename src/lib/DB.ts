import type { LinkObject, Profile } from '../types';
import supabase from './supabase-client'
import bcrypt from 'bcryptjs'

const hashPassword = async (password: string) => {
  const saltRounds = 10; // Adjust for security/performance balance
  return await bcrypt.hash(password, saltRounds);
};

export async function addUser(email: string, password: string) {
    const hashed = await hashPassword(password);
    try {
      console.log('addUser: ', email, password, hashed);

      const { error } = await supabase
        .from('User')
        .insert({email: email, password: hashed})
      if (error) {
        throw error;
      }
    } catch (error) {
     console.error('Error adding user: ', error);
    }
}

export async function verifyUser(email: string, password: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('*').eq('email', email);
      if (error) {
        throw error;
      } else {
        //console.log('verifyUser: ', data);
        const match = await bcrypt.compare(password, data[0].password);
        if(data[0].password && match) return data[0].id;
        else return -1;
      }
    } catch (error) {
        console.error('Error verifying user: ', error);
        return -1;
    }
}

export async function getProfile(user_id: number): Promise<Profile | undefined> {
    try {
      const { data, error } = await supabase
        .from('Profile')
        .select('*')
        .eq('user_id', user_id);
      if(error) throw error;
      else if(!data || data.length === 0) {
        return ({firstname: '', lastname: '', email: '', photo: '', user_id: user_id});
      } else {
        return data[0];
      }
    } catch (error) {
      console.error('Error getting profile: ', error);
      return undefined;
    }
}

export async function updateProfile(profile: Profile, user_id: number) {
    try {
      const { data, error } = await supabase
        .from('Profile')
        .select('*')
        .eq('user_id', user_id);
      if(!data || data.length === 0) {
        const { error } = await supabase
          .from('Profile')
          .insert({...profile, user_id: user_id});
          if(error) {
            throw error;
          }
      } else {
        const { error } = await supabase
          .from('Profile')
          .update({...profile, user_id: user_id})
          .eq('user_id', user_id);
          if(error) {
            throw error;
          }
      }
      if (error) {
        throw error;
      } else {
        //return;
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
}

export async function getLinks(user_id: number): Promise<LinkObject[]> {
    try {
      const { data, error } = await supabase
        .from('Link')
        .select("*")
        .eq('user_id', user_id)
        .order('order', { ascending: true })
      if (error) {
        throw error;
      } else {
        return data.map(lk => ({platform: lk.platform, link: lk.link, user_id: lk.user_id}));
      }
    } catch (error) {
        console.error('Error getting links: ', error);
        return [];
    }
}

// export async function addLink(link: LinkObject) {
//     try {
//         const response = await supabase
//           .from('Link')
//           .select('order')
//           .eq('user_id', link.user_id);

//         const { error } = await supabase
//             .from('Link')
//             .insert({...link, order: (response && response.data) ? response.data.length + 1: 1});
//         if (error) {
//             throw error;
//         } 
//     } catch (error) {
//         console.error('Error adding link: ', error);
//     }
// }

export async function addNewLink(link: LinkObject, order: number): Promise<LinkObject> {
  try {
    if(!link.link_id) {
      const response = await supabase
          .from('Link')
          .insert({platform: link.platform, link: link.link, user_id: link.user_id, order: order})
          .select();
      console.log('addNewLink: ', response, link, order);
      if(response.error) {
        throw response.error;
      } else {
        link.link_id = response.data[0].id;
      }
    } 
  } catch (error) {
      console.error('Error updating links: ', error);
  } finally {
    return link;
  }
}

export async function updateLink(link: LinkObject, order: number) {
  try {
    const updated = ({platform: link.platform, link: link.link, order});
    const response = await supabase
        .from('Link')
        .update(updated)
        .eq('id', link.link_id)
    console.log('updateLinks: ', response, updated, link, order);
    if (response.error) {
        throw response.error;    
    }
  } catch (error) {
      console.error('Error updating links: ', error);
      //return undefined;
  }
}

// export async function updateLinks(links: LinkObject[]) {
//   for(let i=0; i<links.length; ++i) {
//     const link = links[i];
//     try {
//       const updated = ({platform: link.platform, link: link.link, order: i + 1});
//       const response = await supabase
//           .from('Link')
//           .update(updated)
//           .eq('id', link.link_id)
//       console.log('updateLinks: ', response, updated, link.link_id);
//       if (response.error) {
//           throw response.error;    
//       }
//     } catch (error) {
//         console.error('Error updating links: ', error);
//         //return undefined;
//     }
//   }
// }

