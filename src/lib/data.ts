import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse/sync';

let collegesCache: any[] = [];

export async function getColleges() {
  if (collegesCache.length > 0) return collegesCache;
  
  try {
    const csvData = await fs.readFile(path.join(process.cwd(), 'public', 'data', 'colleges.csv'), 'utf8');
    const records = parse(csvData, { columns: true, skip_empty_lines: true });
    
    collegesCache = records.map((record: any, index: number) => {
      const feesMatch = record['Courses and Fees']?.match(/₹(\d+)/);
      const tuition = feesMatch ? parseInt(feesMatch[1], 10) : 100000;
      
      const coursesText = record['Courses and Fees'] || '';
      const courses = coursesText.split('\n').filter(Boolean).map((line: string, i: number) => {
        const [title, feeStr] = line.split(': ₹');
        return {
          id: `c${i}_${index}`,
          title: title || 'Course',
          degree: title?.split(' ')[0] || 'Degree',
          durationYears: title?.includes('M.') || title?.includes('PG') ? 2 : 4,
          fees: feeStr ? parseInt(feeStr, 10) : tuition
        };
      });

      const collegeImages = [
        'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2066&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541339907198-e08759dfc3f0?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498243639359-2cee20e0921a?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1525921429624-479b6a29d84c?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2098&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2070&auto=format&fit=crop'
      ];

      // Clean up the photo URL if it exists
      const csvPhoto = record['Photo']?.trim();
      const hasValidPhoto = csvPhoto && csvPhoto.startsWith('http') && !csvPhoto.includes('No photo found');

      return {
        id: index.toString(),
        name: record['Name']?.replace(/"/g, '') || 'Unknown College',
        location: `${record['City'] || ''}, ${record['State'] || ''}`.replace(/^, |, $/g, '') || 'India',
        city: record['City'] || '',
        state: record['State'] || '',
        description: `Established in ${record['Estd'] || 'N/A'}. Approved by ${record['Approved By'] || 'N/A'}. Affiliated with ${record['Affiliated University'] || 'N/A'}.`,
        tuition,
        rating: record['Rank'] ? parseFloat(record['Rank'].replace(/[^\d.]/g, '')) % 5 || 4.8 : 4.0,
        type: record['Category'] || 'Public',
        imageUrl: hasValidPhoto ? csvPhoto : collegeImages[index % collegeImages.length],
        placement: Math.floor(Math.random() * 40 + 60), // Mock 60-100% placement
        courses: courses.length > 0 ? courses : [
          { id: `c1_${index}`, title: 'Degree Program', degree: 'UG', durationYears: 4, fees: tuition }
        ]
      };
    });
    return collegesCache;
  } catch (e) {
    console.error("Error parsing CSV", e);
    return [];
  }
}

export async function getCollegeById(id: string) {
  const colleges = await getColleges();
  return colleges.find(c => c.id === id) || null;
}
