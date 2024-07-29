import { validateRequest } from "@/lib/auth";

export function obtainCurrentUser() {        
    let f = async () => {
        const user = await validateRequest().then(data => data.user);        
        return user;
    }    
    
    return f();
}