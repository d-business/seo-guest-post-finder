import React, { useState } from 'react';
import { Table, Form, Button, Card, Badge, Spinner, Alert, Dropdown, ButtonGroup } from 'react-bootstrap';

const WebsiteList = ({ websites, loading }) => {
  const [filter, setFilter] = useState({
    minDA: 0,
    maxDA: 80,
    contactType: 'all',
    outreachStatus: 'all',
    acceptsGuestPosts: 'all'
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'domain_authority',
    direction: 'desc'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  // Apply filters
  const filteredWebsites = websites.filter(website => {
    // Filter by DA range
    if (website.domain_authority < filter.minDA || website.domain_authority > filter.maxDA) {
      return false;
    }
    
    // Filter by contact type
    if (filter.contactType !== 'all' && website.contact_type !== filter.contactType) {
      return false;
    }
    
    // Filter by outreach status
    if (filter.outreachStatus !== 'all' && website.outreach_status !== filter.outreachStatus) {
      return false;
    }
    
    // Filter by accepts guest posts
    if (filter.acceptsGuestPosts === 'yes' && !website.accepts_guest_posts) {
      return false;
    } else if (filter.acceptsGuestPosts === 'no' && website.accepts_guest_posts) {
      return false;
    }
    
    return true;
  });

  // Apply sorting
  const sortedWebsites = [...filteredWebsites].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading websites...</p>
      </div>
    );
  }

  if (websites.length === 0) {
    return (
      <Alert variant="info">
        No websites found. Please enter a niche to search for guest post opportunities.
      </Alert>
    );
  }

  const getContactBadge = (type) => {
    switch (type) {
      case 'email':
        return <Badge bg="success">Email</Badge>;
      case 'form':
        return <Badge bg="primary">Form</Badge>;
      default:
        return <Badge bg="secondary">None</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'not_contacted':
        return <Badge bg="warning" text="dark">Not Contacted</Badge>;
      case 'contacted':
        return <Badge bg="info">Contacted</Badge>;
      case 'pending':
        return <Badge bg="primary">Pending</Badge>;
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="website-list">
      <h2 className="mb-4">Website List</h2>
      
      <Card className="mb-4">
        <Card.Header>Filters</Card.Header>
        <Card.Body>
          <Form className="row">
            <Form.Group className="col-md-2 mb-3">
              <Form.Label>Min DA</Form.Label>
              <Form.Control
                type="number"
                name="minDA"
                value={filter.minDA}
                onChange={handleFilterChange}
                min="0"
                max="80"
              />
            </Form.Group>
            
            <Form.Group className="col-md-2 mb-3">
              <Form.Label>Max DA</Form.Label>
              <Form.Control
                type="number"
                name="maxDA"
                value={filter.maxDA}
                onChange={handleFilterChange}
                min="0"
                max="80"
              />
            </Form.Group>
            
            <Form.Group className="col-md-2 mb-3">
              <Form.Label>Contact Type</Form.Label>
              <Form.Select
                name="contactType"
                value={filter.contactType}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="email">Email</option>
                <option value="form">Form</option>
                <option value="none">None</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="col-md-3 mb-3">
              <Form.Label>Outreach Status</Form.Label>
              <Form.Select
                name="outreachStatus"
                value={filter.outreachStatus}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="not_contacted">Not Contacted</option>
                <option value="contacted">Contacted</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="col-md-3 mb-3">
              <Form.Label>Accepts Guest Posts</Form.Label>
              <Form.Select
                name="acceptsGuestPosts"
                value={filter.acceptsGuestPosts}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <strong>{sortedWebsites.length}</strong> websites found
        </div>
        <Button variant="success">
          Export to CSV
        </Button>
      </div>
      
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Domain</th>
              <th
                onClick={() => requestSort('domain_authority')}
                className={getClassNamesFor('domain_authority')}
              >
                DA
              </th>
              <th
                onClick={() => requestSort('organic_traffic')}
                className={getClassNamesFor('organic_traffic')}
              >
                Traffic
              </th>
              <th>Contact</th>
              <th>Guest Posts</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedWebsites.map((website) => (
              <tr key={website.id}>
                <td>
                  <a href={website.url} target="_blank" rel="noopener noreferrer">
                    {website.domain}
                  </a>
                </td>
                <td>{website.domain_authority}</td>
                <td>{website.organic_traffic ? website.organic_traffic.toLocaleString() : 0}</td>
                <td>
                  {getContactBadge(website.contact_type)}
                  {website.contact_email && (
                    <div className="small mt-1">{website.contact_email}</div>
                  )}
                </td>
                <td>
                  {website.accepts_guest_posts ? (
                    <Badge bg="success">Yes</Badge>
                  ) : (
                    <Badge bg="danger">No</Badge>
                  )}
                </td>
                <td>{getStatusBadge(website.outreach_status)}</td>
                <td>
                  <Dropdown as={ButtonGroup} size="sm">
                    <Button variant="outline-primary" size="sm">
                      {website.contact_email ? (
                        <a href={`mailto:${website.contact_email}`} className="text-decoration-none">
                          Email
                        </a>
                      ) : website.contact_form_url ? (
                        <a href={website.contact_form_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                          Contact Form
                        </a>
                      ) : (
                        "No Contact"
                      )}
                    </Button>
                    <Dropdown.Toggle split variant="outline-primary" />
                    <Dropdown.Menu>
                      <Dropdown.Item>Set as Contacted</Dropdown.Item>
                      <Dropdown.Item>Mark as Pending</Dropdown.Item>
                      <Dropdown.Item>Mark as Approved</Dropdown.Item>
                      <Dropdown.Item>Mark as Rejected</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>View Details</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default WebsiteList;