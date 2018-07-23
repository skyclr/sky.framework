sky.action("suggest", function(suggester) {
   return {
       adverts: function(input, event) {

           // Events
           if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27)
               return;

           // Stop if any other
           if(this.suggestAjax)
               this.suggestAjax.stop();

           // Nothing
           if(input.val() == "" || input.val().length < 2) {
               suggester.hideAll();
               return;
           }

           this.suggestAjax = sky.ajax("/ajax/members/search", { name: input.val() })
               .on("success", function(response) {

                   // No filtered
                   if(!response.adverts || !response.adverts.length)
                       suggester.hideAll();

                   var filtered = [];

                   $.each(response.adverts, function(_, advert) {
                       filtered.push(advert.username);
                   });

                   // Show
                   suggester.show(input, filtered);

               }).on("error", function() {
                   suggester.hideAll();
               });

       },

       campaigns: function(input, event){

           // Events
           if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27)
               return;

           // Stop if any other
           if(this.suggestAjax)
               this.suggestAjax.stop();

           // Nothing
           if(input.val() == "" || input.val().length < 2) {
               suggester.hideAll();
               return;
           }

           this.suggestAjax = sky.ajax("/ajax/campaigns/search", { name: input.val() })
               .on("success", function(response) {

                   // No filtered
                   if(!response.campaigns || !response.campaigns.length)
                       suggester.hideAll();

                   var filtered = [];

                   $.each(response.campaigns, function(_, campaign) {

                       filtered.push({ html: campaign.name });
                   });

                   // Show
                   suggester.show(input, filtered);

               }).on("error", function() {
                   suggester.hideAll();
               });
       },

       campaignsSpecial: function(input, event){
           // Events
           if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27)
               return;

           // Nothing
           if(input.val() == "" || input.val().length < 2) {
               suggester.hideAll();
               return;
           }

           if(this.suggestAjax)
               this.suggestAjax.stop();

           this.suggestAjax = sky.ajax("/ajax/campaigns/search", { name: input.val() })
               .on("success", function(response) {

                   // No filtered
                   if(!response.campaigns || !response.campaigns.length)
                       suggester.hideAll();

                   var filtered = [];

                   $.each(response.campaigns, function(_, campaign) {

                       filtered.push({ html: campaign.name+" ("+campaign.advert.username+")", callback: function(){
                           sky.actions.perform(null, null, "page.selectCampaign", [campaign.id]);
                       }});
                   });

                   // Show
                   suggester.show(input, filtered);

               }).on("error", function() {
                   suggester.hideAll();
               });
       }
   }
});