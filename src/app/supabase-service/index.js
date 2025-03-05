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