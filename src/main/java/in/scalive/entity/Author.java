package in.scalive.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Table(name="authors")
public class Author {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String name;
	@Column(unique=true)
	private String email;
	private String about;
	private String Password;
	@Column(nullable=false)
	private String role ="USER";
	
	@OneToMany(mappedBy="author" ,cascade=CascadeType.ALL)
	private List<Post> PostList;
	public Author(String name, String email, String about, String password) {
		
		this.name = name;
		this.email = email;
		this.about = about;
		Password = password;
	}
	
	
	
	
}
