package com.work.service.jsontool;

import java.util.ArrayList;
import java.util.List;

public class Bojson {
	private String id;
	private String text;
	private List<Sgjson> children = new ArrayList<Sgjson>();
	private boolean expanded;
//	"expanded": true,
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public List<Sgjson> getChildren() {
		return children;
	}
	public boolean isExpanded() {
		return expanded;
	}
	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}
	public void setChildren(List<Sgjson> children) {
		this.children = children;
	}
	
}
