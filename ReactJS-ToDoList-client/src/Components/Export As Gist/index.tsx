import React from "react";
import axios from "axios";
import * as S from "./styles";
import Export from "../../Img/export.svg";
import { NewTaskProps } from "../../Contexts/taskType";

interface Props {
    projectTitle: string;
    todos: NewTaskProps[];
    githubToken: string;
}

const ExportAsGist: React.FC<Props> = ({ projectTitle, todos, githubToken }) => {
    const generateMarkdown = () => {
        const totalTodos = todos.length;
        const completedTodos = todos.filter((todo) => todo.isDone).length;
        const pendingTodos = todos.filter((todo) => !todo.isDone);
        let markdown = `# ${projectTitle}\n\n`;
        markdown += `**Summary:** ${completedTodos} / ${totalTodos} completed.\n\n`;
        markdown += `## Pending Tasks\n`;
        pendingTodos.forEach((todo) => {
            markdown += `- [ ] ${todo.name}\n`;
        });

        markdown += `\n## Completed Tasks\n`;
        todos.filter((todo) => todo.isDone).forEach((todo) => {
            markdown += `- [x] ${todo.name}\n`;
        });
        return markdown;
    };

    const exportGist = async () => {
        const markdownContent = generateMarkdown();
        const fileName = `${projectTitle}.md`;
        try {
            const response = await axios.post(
                "https://api.github.com/gists",
                {
                    files: {
                        [fileName]: {
                            content: markdownContent,
                        },
                    },
                    description: `Project summary for ${projectTitle}`,
                    public: false,
                },
                {
                    headers: {
                        Authorization: `token ${githubToken}`,
                    },
                }
            );

            alert(`Gist created! View it here: ${response.data.html_url}`);
        } catch (error) {
            alert("Failed to create gist. Check the console for more details.");
        }
    };

    return (
        <S.Container onClick={exportGist}>
            <S.Icon src={Export}/>
            <S.Text>Export To Gist</S.Text>
        </S.Container>
    );
};

export default ExportAsGist;
