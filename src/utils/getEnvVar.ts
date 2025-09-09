export const getEnvVar = (value:string)=>{
             const envVar = process.env[value]
            if(envVar) return envVar
            throw new Error(`Cannot find environment variable ${value} `)
}