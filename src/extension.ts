import * as vscode from 'vscode';
import axios from 'axios';
import { AzureAccountExtensionApi } from './azure-account.api';



export async function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider('package-subscriptions', new TreeDataProvider());

  //connect to azure account
  //const azureAccount = vscode.extensions.getExtension<AzureAccountExtensionApi>('ms-vscode.azure-account')!.exports;
  //if (!(await azureAccount.waitForLogin())) {
  // 	await vscode.commands.executeCommand('azure-account.askForLogin');
  // }
  // else{
  //   console.log(azureAccount.subscriptions);
  // }

  // const credential = new VisualStudioCodeCredential();
  // var token = await credential.getToken(tokenAudience, { tenantId: tenantID });
  //let azureAccount = vscode.extensions.getExtension<any>('ms-vscode.azure-account');
  // let importedApi = azureAccount!.activate;
  //console.log(importedApi.toString());
}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  onDidChangeTreeData?: vscode.Event<TreeItem | null | undefined> | undefined;


  data!: TreeItem[];

  constructor() {
    // this.onDidChangeTreeData= new vscode.Event<TreeItem | null | undefined>();
    // this.getData();
  }

  getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  async getChildren(element?: TreeItem | undefined): Promise<TreeItem[]> {
    if (element === undefined) {
      return await this.getData();
    }
    //return Promise.all<TreeItem[]>(element.children);
    return [];
  }

 async getData(): Promise<TreeItem[]> {
     return await  axios.get("http://localhost:5282/api/Location").then(response => {
      console.log(response.status);
      return [new TreeItem('subscription_1', vscode.TreeItemCollapsibleState.None),
      new TreeItem('subscription_2', vscode.TreeItemCollapsibleState.None),
      new TreeItem('subscription_3', vscode.TreeItemCollapsibleState.None)];
    });
   }
}


class TreeItem extends vscode.TreeItem {
  children: TreeItem[] | undefined;

  constructor(label: string, collapsibleState: vscode.TreeItemCollapsibleState, children?: TreeItem[]) {
    super(
      label,
      children === undefined ? vscode.TreeItemCollapsibleState.None :
        vscode.TreeItemCollapsibleState.Expanded
    );
    this.children = children;
  }
}


