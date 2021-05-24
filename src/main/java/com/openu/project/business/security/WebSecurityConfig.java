package com.openu.project.business.security;

import com.openu.project.business.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

//import static org.attoparser.config.ParseConfiguration.PrologPresence.FORBIDDEN;
import static org.springframework.http.HttpStatus.FORBIDDEN;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


//@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    MyUserDetailsService userDetailsService;
    @Autowired
    UsersService userService;

    public static final String SIGN_UP_URL = "/api/services/controller/user";

    //private static final String ENCODED_PASSWORD = "$2a$10$AIUufK8g6EFhBcumRRV2L.AQNz3Bjp7oDQVFiO5JJMBFZQ6x2/R/2";


//    private static final RequestMatcher PROTECTED_URLS = new OrRequestMatcher(
//            new AntPathRequestMatcher("/category/**")
//    );

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth
               .userDetailsService(userDetailsService)
               .passwordEncoder(passwordEncoder());
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.authorizeRequests()
//                .antMatchers("/admin").hasRole("ADMIN")
//                .antMatchers("/category").hasAnyRole("ADMIN" , "USER")
//                .antMatchers("/products").hasAnyRole("ADMIN" , "USER")
//                .antMatchers("/*").permitAll()
//                .and().formLogin();
//    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {


        http
                .cors().and().csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, SIGN_UP_URL).permitAll()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                //.antMatchers(HttpMethod.PUT).permitAll()
                .antMatchers("/category**").permitAll()
                .antMatchers("/users**").permitAll()
                .antMatchers("/users/**").permitAll()

                .antMatchers("/createUser**").permitAll()

                .antMatchers("/product**").permitAll()
                .antMatchers("/products/**").permitAll() //put
                .antMatchers("/products**").permitAll() //put
                .antMatchers("/products/category/**").permitAll()
                .antMatchers("/image**").permitAll()
                .antMatchers("/purchase**").permitAll()
                .antMatchers( "/reservation**").permitAll()
                .antMatchers( "/reservation/**").permitAll() //put
                .antMatchers( "/confirmReservation").permitAll() //put
                .antMatchers( "/createPurchase").permitAll() //put
                .antMatchers( "/createPurchase").permitAll() //put
                .antMatchers( "/reservation/getById/**").permitAll()
                .antMatchers( "/reservation/getByMail/**").permitAll()
                .antMatchers("/createNewReservation*").permitAll()
                .antMatchers("/role*").permitAll()
                .antMatchers("/saveImage*").permitAll()
                .antMatchers("/deleteProduct*").permitAll()
                .antMatchers("/getProductsByReservation*").permitAll()
                .antMatchers("/reservation/fullUserReservation/*").permitAll()
                .antMatchers("/admin/allUsersFullReservation*").permitAll()




                .antMatchers(HttpMethod.POST, "/users/{userId}/roles").permitAll()
                .antMatchers(HttpMethod.POST, "/{userId}").fullyAuthenticated()
                .anyRequest().authenticated()
                .and()
                // Authentication filter, this will intercept request path for login ("/login").
                .addFilter(new UUIDAuthenticationFilter(authenticationManager(), userService))
                .addFilter(new UUIDAuthorizationFilter(authenticationManager(), userService))
                // Authorization filter to check jwt validity.
                // This disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

//        http.cors().and()
//                .authorizeRequests().antMatchers("/category/**").permitAll().anyRequest().authenticated()
//                .and()
//                .authorizeRequests()
//                //.antMatchers("/**").permitAll()
//                .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .addFilter(new JWTAuthenticationFilter(authenticationManager(), userService))
//                // this disables session creation on Spring Security
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

//        http
//                .sessionManagement()
//                .sessionCreationPolicy(STATELESS)
//                .and()
//                .exceptionHandling()
//                .defaultAuthenticationEntryPointFor(forbiddenEntryPoint(), PROTECTED_URLS)
//                .and()
//                .authorizeRequests()
//                .requestMatchers(PROTECTED_URLS)
//                .authenticated()
//                .and()
//                .csrf().disable()
//                .httpBasic().disable()
//                .logout().disable()
//                .formLogin();//.disable();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//
//    @Bean
//    @Override
//    public UserDetailsService userDetailsService() {
//        UserDetails user =
//                User.withDefaultPasswordEncoder()
//                        .username("user")
//                        .password("password")
//                        .roles("USER")
//                        .build();
//
//        return new InMemoryUserDetailsManager(user);
//    }


    @Bean
    AuthenticationEntryPoint forbiddenEntryPoint() {
        return new HttpStatusEntryPoint(FORBIDDEN);
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }

}
