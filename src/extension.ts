import * as vscode from 'vscode';
import axios from 'axios';


export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider('package-subscriptions', new TreeDataProvider());
}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;

  data!: TreeItem[];

  constructor() {
    this.getData().then(d=>
      this.data=d);
   }

  getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
    if (element === undefined) {
      
      return this.data;
    }
    return element.children;
  }

  async getData():Promise<TreeItem[]>{
    
    await axios.get("http://localhost:5282/api/Location").then(response=>{
      console.log(response.status);
    })
    .then(result=>{
      console.log(result);
        this.data = [new TreeItem('subscription_1', vscode.TreeItemCollapsibleState.None),
          new TreeItem('subscription_2', vscode.TreeItemCollapsibleState.None),
          new TreeItem('subscription_3', vscode.TreeItemCollapsibleState.None)];
      })
    .catch(error=> console.log('error',error));
   
    return this.data;

    }
}

// var myHeaders = new Header();
    // myHeaders.append("apikey", "jkeLXhptQvmP0mAWuCA9kR0ucF3macfp");
    
    // var requestOptions = {
    //   method: 'GET',
    //   redirect: 'follow',
    //   headers:  {"apikey":"jkeLXhptQvmP0mAWuCA9kR0ucF3macfp"}
    // };
     
    // axios.get("https://api.apilayer.com/exchangerates_data/convert?to=GBP&from=EUR&amount=5", requestOptions)
    //   .then(response =>{
    //     response.data();
    //     console.log(response.status);
    //   } )
    //   .then(result =>{
    //     console.log(result);
    //     this.data = [new TreeItem('subscription_1', vscode.TreeItemCollapsibleState.None),
    //       new TreeItem('subscription_2', vscode.TreeItemCollapsibleState.None),
    //       new TreeItem('subscription_3', vscode.TreeItemCollapsibleState.None)];
    //   } )
    //   .catch(error => console.log('error', error));
    // }

  // async getData(){
  //   try {
  //       await axios.get<any>('https://www.boi.org.il/currency.xml').then((x)=>{
  //         if(x)
  //         {
  //           this.data= [new TreeItem('subscription_1',vscode.TreeItemCollapsibleState.None),
  //           new TreeItem('subscription_2',vscode.TreeItemCollapsibleState.None),
  //           new TreeItem('subscription_3',vscode.TreeItemCollapsibleState.None)];
  //         }
  //       });
        
  //    } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log('error message: ', error.message);
  //      } else {
  //       console.log('unexpected error: ', error);
  //      }
  //   }
  // }
  
// }

class TreeItem extends vscode.TreeItem {
  children: TreeItem[]|undefined;
  
  constructor(label: string,  collapsibleState: vscode.TreeItemCollapsibleState, children?: TreeItem[]) {
    super(
        label,
         children === undefined ? vscode.TreeItemCollapsibleState.None :
                                 vscode.TreeItemCollapsibleState.Expanded                        
      );
    this.children = children;
  }
}


