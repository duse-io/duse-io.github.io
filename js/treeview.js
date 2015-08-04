(function($) {
    $.fn.treeview = function(data) {
		
		var id = 0;
		
		generateList = function(object,data)
		{
			for (var index = 0; index < data.length; ++index)
			{			
				id++;
				var currentID = "treemenu"+id;
				
				var item = data[index];
				
				var icon = "";
				if(item.type == "folder")
					icon = '<i class="open-entry-icon mdi-file-folder-open"></i><i class="close-entry-icon mdi-file-folder"></i>'
				else if(item.type == "shared")
					icon = '<i class="open-entry-icon mdi-file-folder-open"></i><i class="close-entry-icon mdi-file-folder-shared"></i>'
				else
					icon = '<i class="open-entry-icon mdi-'+item.icon+'"></i><i class="close-entry-icon mdi-'+item.icon+'"></i>';
							
				entry = jQuery('<div/>', {
					class: 'list-group-item close-entry',
					html: '<div class="row-action-primary">'+icon+'</div><div class="row-content"><div class="least-content">'+item.sub+'</div><h4 class="list-group-item-heading">'+item.title+'</h4><p class="list-group-item-text">'+item.text+'</p></div>',
					click: function(){
						$(this).toggleClass("close-entry");
						$(this).toggleClass("open-entry");
						
						if($("#"+$(this).attr("data-menuid")).hasClass("list-hidden"))
						{
							$("#"+$(this).attr("data-menuid")).slideDown();
						}
						else
						{
							$("#"+$(this).attr("data-menuid")).slideUp();
						}
						
						$("#"+$(this).attr("data-menuid")).toggleClass("list-hidden");
					}
				});	
				
				entry.attr("data-menuid",currentID);

				children = jQuery('<div/>', {
					id: currentID,
					class: 'list-group-children list-hidden'
				});					
				
				separator = jQuery('<div/>', {
					class: 'list-group-separator'
				});
				
				object.append(entry);
				object.append(separator);
				object.append(children);
				
				if (typeof item.children !== 'undefined')
				{
					generateList(children,item.children);
				}				
			}
		}

		this.addClass("list-group");
		generateList(this,data);
    }
}(jQuery));