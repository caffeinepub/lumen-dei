import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  type TemplateCategory = {
    #instagram;
    #old_money;
  };

  module TemplateCategory {
    public func compare(cat1 : TemplateCategory, cat2 : TemplateCategory) : Order.Order {
      switch (cat1, cat2) {
        case (#instagram, #old_money) { #less };
        case (#old_money, #instagram) { #greater };
        case (_, _) { #equal };
      };
    };
  };

  type CustomTemplate = {
    id : Text;
    name : Text;
    category : TemplateCategory;
    canvasState : Text;
    created : Time.Time;
  };

  module CustomTemplate {
    public func compareByCategoryAndCreated(template1 : CustomTemplate, template2 : CustomTemplate) : Order.Order {
      switch (TemplateCategory.compare(template1.category, template2.category)) {
        case (#equal) {
          Int.compare(template1.created, template2.created);
        };
        case (order) { order };
      };
    };
  };

  type PrebuiltTemplate = {
    id : Text;
    name : Text;
    category : TemplateCategory;
    description : Text;
    thumbnailHint : Text;
  };

  module PrebuiltTemplate {
    public func compareByCategoryAndName(template1 : PrebuiltTemplate, template2 : PrebuiltTemplate) : Order.Order {
      switch (TemplateCategory.compare(template1.category, template2.category)) {
        case (#equal) {
          Text.compare(template1.name, template2.name);
        };
        case (order) { order };
      };
    };
  };

  let customTemplates = Map.empty<Text, CustomTemplate>();

  let prebuiltTemplates : [PrebuiltTemplate] = [
    {
      id = "preset1";
      name = "Classic Instagram";
      category = #instagram;
      description = "A clean, modern Instagram template.";
      thumbnailHint = "classic_instagram.jpg";
    },
    {
      id = "preset2";
      name = "Old Money Vibes";
      category = #old_money;
      description = "Luxurious old money style template.";
      thumbnailHint = "old_money_vibes.jpg";
    },
  ];

  public query ({ caller }) func getAllCustomTemplates() : async [CustomTemplate] {
    customTemplates.values().toArray().sort(CustomTemplate.compareByCategoryAndCreated);
  };

  public shared ({ caller }) func saveCustomTemplate(template : CustomTemplate) : async () {
    if (customTemplates.containsKey(template.id)) {
      Runtime.trap("Template id is already used. Overwriting is not supported. ");
    };
    customTemplates.add(template.id, template);
  };

  public query ({ caller }) func getCustomTemplate(id : Text) : async CustomTemplate {
    switch (customTemplates.get(id)) {
      case (null) { Runtime.trap("Template does not exist") };
      case (?template) { template };
    };
  };

  public shared ({ caller }) func deleteCustomTemplate(id : Text) : async () {
    if (not customTemplates.containsKey(id)) {
      Runtime.trap("Custom template does not exist");
    };
    customTemplates.remove(id);
  };

  public query ({ caller }) func getPrebuiltTemplates() : async [PrebuiltTemplate] {
    prebuiltTemplates.sort(PrebuiltTemplate.compareByCategoryAndName);
  };

  public query ({ caller }) func getTemplatesByCategory(category : TemplateCategory) : async {
    customTemplates : [CustomTemplate];
    prebuiltTemplates : [PrebuiltTemplate];
  } {
    let custom = customTemplates.values().toArray().filter(
      func(t) { t.category == category }
    );
    let prebuilt = prebuiltTemplates.filter(
      func(t) { t.category == category }
    );
    {
      customTemplates = custom.sort(CustomTemplate.compareByCategoryAndCreated);
      prebuiltTemplates = prebuilt.sort(PrebuiltTemplate.compareByCategoryAndName);
    };
  };
};
