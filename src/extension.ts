import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider('package-subscriptions', new TreeDataProvider());
}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;

  data: TreeItem[];

  constructor() {
    this.data = [new TreeItem('subscription_1',vscode.TreeItemCollapsibleState.None),
    new TreeItem('subscription_2',vscode.TreeItemCollapsibleState.None),
    new TreeItem('subscription_3',vscode.TreeItemCollapsibleState.None)];
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
}

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


