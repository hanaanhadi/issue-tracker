import { Skeleton, Table } from '@radix-ui/themes'
import React from 'react'
import IssueActions from './IssueActions';

const LoadingIssuesPage = () => {
    const issues = [1, 2, 3, 4, 5];

    return (
        <div>
            <IssueActions />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
                        {/* <Table.ColumnHeaderCell></Table.ColumnHeaderCell> */}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue}>
                            <Table.Cell>
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell>
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell>
                                <Skeleton />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

        </div>
    )
}

export default LoadingIssuesPage