import React, { useContext,useState } from 'react';
import styles from '@/styles/Login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SchemaLogin } from '@/types';
import Link from 'next/link';
interface User {
    uid: string;
    displayName: string | null;
}

const Login: React.FC = () => {

    const router = useRouter();

    const {register,handleSubmit,watch,formState: { errors },} = useForm({resolver: zodResolver(SchemaLogin),});
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    

        

    return (
        <>
        <div className={styles.LoginContainer}>
            <div className={styles.LoginWrapper}>
                <div className={styles.LoginImageWrapper}>
                    <div className={styles.LoginImage}>
                        <Image  src="/assets/images/logo-devlinks-large.svg" alt="devlink-logo" fill />
                    </div>
                </div>
                
                <form onSubmit={handleSubmit(()=>{
                    const watched=watch()
                    setEmail(watched.email)
                    setPassword(watched.password)
                    // signInWithEmail()
                })} className={styles.LoginForm} action="">
                    <h1 className={styles.LoginH1}>
                        Login
                    </h1>
                    
                    <p className={styles.LoginDescription}>
                    Add your details below to get back into the app
                    </p>
                    <label style={errors.email ? { color: '#EC5757' } : {}} className={styles.LoginLabel} htmlFor="">
                        Email adress
                    </label>
                    <div  className={styles.LoginInputWrapper}>
                        <Image className={styles.LoginImageInput} src='/assets/images/icon-email.svg' alt='icon-email' height={16} width={16} />
                        <input  style={errors.email ? { border: '#EC5757 1px solid' } : {}}   {...register('email')} className={styles.LoginInput} type="text" placeholder='e.g. lucasbeaugosse@email.com' />
                        {errors && errors.email && <p className={styles.LoginError}>{errors.email.message?.toString()}</p>}
                    </div>
                    
                    <label style={errors.password ? { color: '#EC5757' } : {}}  className={styles.LoginLabel} htmlFor="">
                        Password
                    </label>
            
                    <div className={styles.LoginInputWrapper}>
                        <Image  className={styles.LoginImageInput} src='/assets/images/icon-password.svg' alt='icon-password' height={16} width={16} />
                        <input   style={errors.password ? { border: '#EC5757 1px solid' } : {}}    {...register('password')} className={styles.LoginInput}  placeholder='Enter your password' type = "password" />
                        {(errors && errors.password && <p className={styles.LoginError}>{errors.password.message?.toString()}</p>) || (errors && errors.message && <p className={styles.LoginError}>Invalid password</p>) }
                    </div>
                    <button type='submit' className={styles.LoginButton}>Login</button>
                    <div className={styles.LoginDiv}>
                        Dont have a account
                        <Link  href='/register'className={styles.LoginNoAccount}>
                            Create account
                        </Link>
                    </div>
                    <div>
                    
                    </div>
                    
                </form>
            </div>
        </div>
    </>
    );
};

export default Login;
