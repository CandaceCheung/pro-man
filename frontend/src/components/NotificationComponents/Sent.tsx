import { Container, Input, Table } from "@mantine/core";

export function Sent() {
    const elements = [
        { message: 6, receiver: 12.011, created_at: 'C', status: 'Carbon' },
        { message: 7, receiver: 14.007, created_at: 'N', status: 'Nitrogen' },
        { message: 39, receiver: 88.906, created_at: 'Y', status: 'Yttrium' },
        { message: 56, receiver: 137.33, created_at: 'Ba', status: 'Barium' },
        { message: 58, receiver: 140.12, created_at: 'Ce', status: 'Cerium' },
      ];

    const rows = elements.map((element) => (
        <tr key={element.receiver}>
          <td>{element.message}</td>
          <td>{element.receiver}</td>
          <td>{element.created_at}</td>
          <td>{element.status}</td>
        </tr>
      ));

    return (
        <div style={{padding: '10px'}}>
            <Container fluid={true}>
                <Input.Wrapper
                    id="input-demo"
                    withAsterisk
                    label="Search"
                    error="Search not found"
                >
                    <Input id="input-demo" placeholder="Your email" />
                </Input.Wrapper>
                <Container fluid={true}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Message</th>
                                <th>Receiver</th>
                                <th>Sent On</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Container>
            </Container>
        </div>
    )
}