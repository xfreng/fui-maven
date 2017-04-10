function CloseWindow() {            
    if (window.CloseOwnerWindow) 
    	return window.CloseOwnerWindow("");
    else 
    	window.close();            
}