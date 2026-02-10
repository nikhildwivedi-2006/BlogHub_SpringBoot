package in.scalive.interceptor;

import java.io.PrintWriter;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class SessionAuthInterceptor implements HandlerInterceptor{

	//this method for those user who sent request is loggedin or not 
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
	    HttpSession session = request.getSession(false);
	    System.out.println("path : " + request.getRequestURI());
	    System.out.println("mehtod : " + request.getMethod());    
	    System.out.println("Session Present ? : " + session!=null);
		
	    
	    if(session!=null) {
	    	System.out.println("session id :"+session.getId());
	    	System.out.println("user id :"+session.getAttribute("userId"));
	    }
	    if(session==null || session.getAttribute("userId")==null) {
	    	response.setStatus(401);  //unauthorized
	    	response.setContentType("application/json");
	    	PrintWriter pw = response.getWriter();
	    	pw.write("{\"error\" : \"Please login first\"}");
	    	return false; // false return means user will be logged in
	    }
	        Long userId =(Long)session.getAttribute("userId");
	        String userRole = (String)session.getAttribute("userRole");
	        
	        request.setAttribute("currentUserId", userId);
	        request.setAttribute("currentUserRole", userRole);
	        
	        String path= request.getRequestURI();
	        String method = request.getMethod();
	        
	        if(path.startsWith("/api/categories")) {
	        	if(!method.equals("GET")&& !userRole.equals("Admin")) {//it means request come from put post and delete  and you are not admin
	        		response.setStatus(403);  //Forbidden
	    	    	response.setContentType("application/json");
	    	    	PrintWriter pw = response.getWriter();
	    	    	pw.write("{\"error\" : \"Admin access required\"}");
	    	    	return false;
	        	}
	        }
	        
	    return true;
	}
	
}
