import React from 'react';
import { Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = ({ niche, stats, loading }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Analyzing websites for {niche}...</p>
      </div>
    );
  }

  if (!niche) {
    return (
      <Alert variant="info">
        Please enter a niche to see dashboard statistics.
      </Alert>
    );
  }

  if (!stats) {
    return null;
  }

  // Prepare data for DA Range chart
  const daRangeData = {
    labels: ['DA 0-20', 'DA 21-40', 'DA 41-60', 'DA 61-80'],
    datasets: [
      {
        label: 'Websites by Domain Authority',
        data: [
          stats.da_ranges['0-20'],
          stats.da_ranges['21-40'],
          stats.da_ranges['41-60'],
          stats.da_ranges['61-80']
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Outreach Status chart
  const outreachStatusData = {
    labels: ['Not Contacted', 'Contacted', 'Pending', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'Websites by Outreach Status',
        data: [
          stats.outreach_status.not_contacted,
          stats.outreach_status.contacted,
          stats.outreach_status.pending,
          stats.outreach_status.approved,
          stats.outreach_status.rejected
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Contact Types chart
  const contactTypesData = {
    labels: ['Email', 'Form', 'None'],
    datasets: [
      {
        label: 'Websites by Contact Type',
        data: [
          stats.contact_types.email,
          stats.contact_types.form,
          stats.contact_types.none
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2 className="mb-4">Dashboard for: {niche}</h2>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Total Websites</Card.Title>
              <div className="display-4">{stats.total_websites}</div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Accept Guest Posts</Card.Title>
              <div className="display-4">{stats.accepts_guest_posts}</div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Email Contact</Card.Title>
              <div className="display-4">{stats.contact_types.email}</div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Not Contacted</Card.Title>
              <div className="display-4">{stats.outreach_status.not_contacted}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Domain Authority Distribution</Card.Header>
            <Card.Body>
              <Bar data={daRangeData} />
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Outreach Status</Card.Header>
            <Card.Body>
              <Pie data={outreachStatusData} />
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Contact Types</Card.Header>
            <Card.Body>
              <Pie data={contactTypesData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );