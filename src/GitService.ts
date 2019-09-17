import * as vscode from 'vscode';
import { GitExtension, API, Repository } from './@types/git';

class GitService {
    private isGitAvailable: boolean = false;
    private gitExtension: vscode.Extension<GitExtension> | undefined;
    private api: API | undefined;

    constructor() {
        this.gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git');

        if (!this.gitExtension) {
            return;
        }

        this.isGitAvailable = true;
        this.api = this.gitExtension.exports.getAPI(1);
    }

    private getSelectedRepository(repos: Repository[]): Repository | undefined {
        return repos.find((repo: Repository) => repo.ui.selected);
    }

    public isAvailable(): boolean {
        return this.isGitAvailable;
    }

    public getSCMInputBoxMessage(): string {
        const repo = this.getSelectedRepository((<API>this.api).repositories);

        if (repo) {
            return repo.inputBox.value;
        }

        return '';
    }

    public setSCMInputBoxMessage(message: string): void {
        const repo = this.getSelectedRepository((<API>this.api).repositories);

        if (repo) {
            repo.inputBox.value = message;
        }
    }
}

export default GitService;