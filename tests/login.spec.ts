import { test, expect } from '@playwright/test';

test.describe('Login Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // TC01: Login เจ้าของตลาด สำเร็จ
  test('TC01 Login เจ้าของตลาด สำเร็จ', async ({ page }) => {
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0800000000');
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();

    await expect(page.getByText('ยินดีต้อนรับ')).toBeVisible();
  });

  // TC02: Login เจ้าของตลาด ใส่เบอร์โทรผิด
  test('TC02 Login เจ้าของตลาด ใส่เบอร์โทรผิด', async ({ page }) => {
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0999999999');
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();

    // เช็คว่ากดแล้วยังอยู่ที่หน้า Login เดิม (ไม่เด้งไปหน้าอื่น)
    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();
  });

  // TC03: Login เจ้าของตลาด ใส่ pws ผิด
  test('TC03 Login เจ้าของตลาด ใส่ pws ผิด', async ({ page }) => {
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0800000000');
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('wrongpassword123');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();

    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();
  });

  // TC04: Login ไม่กรอกข้อมูล
  test('TC04 Login ไม่กรอกข้อมูล', async ({ page }) => {
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();

    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();
  });

  // TC05: Login เบอร์โทรศัพท์ไม่ครบ 10 หลัก
  test('TC05 Login เบอร์โทรศัพท์ไม่ครบ 10 หลัก', async ({ page }) => {
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('08000');
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();

    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();
  });

  // TC06: Login รหัสผ่านน้อยกว่า 8 ตัวอักษร
  test('TC06 Login รหัสผ่านน้อยกว่า 8 ตัวอักษร', async ({ page }) => {
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0800000000');
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('1234567');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();

    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();
  });

});