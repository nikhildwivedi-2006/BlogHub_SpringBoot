package in.scalive.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="posts")
public class Post {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String content;
	private LocalDateTime createdAt;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="author_id" , nullable=false)
	private Author author;
	 
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="category_id" , nullable=false)
	private Category category;
}
