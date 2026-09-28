import { v4 as uuid } from "uuid";

export default class Service {
  Create(title: string, description: string, url: string, tags?: string[]) {
    const id = uuid();

    let listOfLinks: any = [];

    if (localStorage.getItem("links") === null) {
      //create a new item in local storage and save the current one

      listOfLinks.push({
        id: id,
        title: title,
        description: description,
        url: url,
        tags: tags,
      });

      localStorage.setItem("links", JSON.stringify(listOfLinks));
    } else {
      // reset the list
      listOfLinks.splice(0, listOfLinks.length);

      // get from local storage the add to the list
      let retrievedLinks = localStorage.getItem("links");
      listOfLinks = JSON.parse(retrievedLinks!);

      // add to the list if the id doesn't exist already

      const findNewId = this.find(id, listOfLinks);

      if (findNewId === undefined) {
        listOfLinks.push({
          id: id,
          title: title,
          description: description,
          url: url,
          tags: tags,
        });
      }

      // save the list
      localStorage.setItem("links", JSON.stringify(listOfLinks));
    }
  }

  updateLink(
    id: any,
    newTitle: string,
    newDescription: string,
    newUrl: string,
    newTags: string[],
  ) {
    let listOfLinks = [];

    let retrievedLinks = localStorage.getItem("links");
    listOfLinks = JSON.parse(retrievedLinks!);

    // search for the item to update
    const foundItem = this.find(id, listOfLinks);

    let indexOfFoundItem = listOfLinks.indexOf(foundItem);

    // console.log(foundItem);
    if (foundItem !== undefined) {
      listOfLinks.splice(indexOfFoundItem, 1);
      listOfLinks.push({
        id: id,
        title: newTitle,
        description: newDescription,
        url: newUrl,
        tags: newTags,
      });
    }

    //save to the localStorage to reflect changed
    localStorage.setItem("links", JSON.stringify(listOfLinks));

    return { id, newTitle, newDescription, newUrl, newTags };
  }

  deleteLink(id: string): boolean {
    const listOfLinks = this.getLinks();

    const updatedLinks = listOfLinks.filter((link) => link.id !== id);

    // Nothing was deleted
    if (updatedLinks.length === listOfLinks.length) {
      return false;
    }

    localStorage.setItem("links", JSON.stringify(updatedLinks));

    return true;
  }

  deleteAllLinks() {
    localStorage.removeItem("links");
  }

  ReadAllLinks() {
    return this.getLinks();
  }

  GetLength(): Number {
    return this.getLinks().length;
  }

  ReadLastLink() {
    const links = this.getLinks();
    return links[links.length - 1];
  }

  find(id: any, array: any[]) {
    return array.find((link) => link.id === id);
  }
  private getLinks(): any[] {
    const raw = localStorage.getItem("links");
    return raw ? JSON.parse(raw) : [];
  }
}
