import supabase from "./supabaseConfig";

export const signup = async (payload) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: payload?.email,
        password: payload?.password,
      });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
}

export const login = async (payload) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: payload?.email,
            password: payload?.password,
        });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export const signOut = async() => {
    try {
        const data = await supabase.auth.signOut()
        if (data?.error) {
            throw new Error(error?.message)
        }
        return data;
    } catch {
        throw error;
    }
} 

export const getUserData = async() => {
    try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export const uploadFile = async(image, folder) => {
    try {
        if (!image) {
            return null;
        }
        const { data, error } = await supabase.storage
            .from(folder)
            .upload(`public/${Date.now()}_${image.name}`, image);
        if (error) {
            return null;
        }
        return `https://oeeotrloowgarosklmzz.supabase.co/storage/v1/object/public/${data.fullPath}`;
    } catch (error) {
        return null;
    }
}

export const addBlogData = async(payload, table) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .insert([
                payload
            ]);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error(`Error inserting user data: ${error.message}`);
    }
};

export const getBlogFromDb = async(table, limit = 10, offset = 0) => {
    try {
        const { data, error, count } = await supabase
            .from(table)
            .select("*", { count: "exact" })
            .range(offset, offset + limit - 1);
        if (error) {
            throw new Error(error.message);
        }
        return { data, count };
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};