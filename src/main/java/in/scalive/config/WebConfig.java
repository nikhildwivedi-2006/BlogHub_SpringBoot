package in.scalive.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import in.scalive.interceptor.SessionAuthInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(sessionAuthInterceptorAuthInterceptor)
		.addPathPatterns("/api/**")
		.excludePathPatterns("/api/auth/**" ,"/error" ,"/favicon.ico");
	}

	private SessionAuthInterceptor sessionAuthInterceptorAuthInterceptor;

	@Autowired
	public WebConfig(SessionAuthInterceptor sessionAuthInterceptorAuthInterceptor) {
		
		this.sessionAuthInterceptorAuthInterceptor = sessionAuthInterceptorAuthInterceptor;
	}


	

}
