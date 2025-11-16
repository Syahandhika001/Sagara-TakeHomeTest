import { faker } from '@faker-js/faker';
import { User } from '../types';
import * as fs from 'fs';
import * as path from 'path';

const NUM_USERS = 50;
const roles: User['role'][] = ['Admin', 'User', 'Guest'];

// ✅ List departments
const departments = [
  'Engineering',
  'Human Resources', 
  'Sales',
  'Marketing',
  'Finance',
  'Operations',
  'Customer Support'
];

function generateUsers(count: number): User[] {
  const users: User[] = [];
  
  for (let i = 1; i <= count; i++) {
    const randomNum = Math.random();
    let role: User['role'];
    
    if (randomNum < 0.1) {
      role = 'Admin';
    } else if (randomNum < 0.7) {
      role = 'User';
    } else {
      role = 'Guest';
    }
    
    users.push({
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      role: role,
      createdAt: faker.date.between({ 
        from: '2022-01-01', 
        to: '2024-11-01' 
      }).toISOString(),
      department: departments[Math.floor(Math.random() * departments.length)],
      status: Math.random() > 0.1 ? 'active' : 'inactive' 
    });
  }
  
  return users;
}

function saveToJson() {
  console.log('🚀 Generating dummy data...\n');
  
  const users = generateUsers(NUM_USERS);
  
  const dataDir = path.join(__dirname, '../data');
  const filePath = path.join(dataDir, 'users.json');
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(
    filePath,
    JSON.stringify(users, null, 2),
    'utf-8'
  );
  
  
  const stats = {
    total: users.length,
    byRole: {
      admin: users.filter(u => u.role === 'Admin').length,
      user: users.filter(u => u.role === 'User').length,
      guest: users.filter(u => u.role === 'Guest').length,
    },
    byDepartment: {} as Record<string, number>,
    active: users.filter(u => u.status === 'active').length,
  };

  users.forEach(user => {
    if (user.department) {
      stats.byDepartment[user.department] = (stats.byDepartment[user.department] || 0) + 1;
    }
  });
  
  console.log('✅ Data generated successfully!\n');
  console.log('📊 Statistics:');
  console.log(`   Total Users: ${stats.total}`);
  console.log(`   By Role:`);
  console.log(`     - Admin: ${stats.byRole.admin}`);
  console.log(`     - User: ${stats.byRole.user}`);
  console.log(`     - Guest: ${stats.byRole.guest}`);
  console.log(`   Active: ${stats.active} (${Math.round(stats.active/stats.total*100)}%)`);
  console.log(`   Departments: ${Object.keys(stats.byDepartment).length}`);
  Object.entries(stats.byDepartment).forEach(([dept, count]) => {
    console.log(`     - ${dept}: ${count}`);
  });
  console.log(`\n📁 Saved to: ${filePath}`);
}

saveToJson();